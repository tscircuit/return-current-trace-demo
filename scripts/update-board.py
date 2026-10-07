"""Download and validate the current AM3352 PCB export without rewriting results."""
import hashlib
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
ENDPOINT = 'https://api.tscircuit.com/package_releases/get_preview_circuit_json?package_name=astra%2Fam3352-sbc&is_latest=true'
HISTORICAL_SHA = 'c868860d9c327475ba597cea196d0eeace169459db16d5ccf266ae9055f26d34'

def update(circuit):
    board = next(e for e in circuit if e['type'] == 'pcb_board')
    ground = next(e['source_net_id'] for e in circuit if e['type'] == 'source_net' and e.get('name') == 'GND')
    source_traces = {e['source_trace_id']: e for e in circuit if e['type'] == 'source_trace'}
    ddr = [e for e in circuit if e['type'] == 'pcb_trace' and source_traces.get(e.get('source_trace_id'), {}).get('name', '').startswith('DDR_')]
    layers = Counter(p['layer'] for e in ddr for p in e['route'] if p.get('layer'))
    pours = [e for e in circuit if e['type'] == 'pcb_copper_pour' and e.get('source_net_id') == ground]
    if board['num_layers'] != 4 or set(layers) != {'top', 'bottom'} or {e['layer'] for e in pours} != {'inner1', 'inner2'}:
        raise ValueError('Unexpected stackup: inspect the new export before replacing this snapshot')
    content = json.dumps(circuit, separators=(',', ':')).encode()
    sha = hashlib.sha256(content).hexdigest()
    completed = []
    for name in ['cpu', 'memory']:
        report_path = ROOT / f'data/em-latest-ddr-d8-{name}/normalized-report.json'
        if report_path.exists():
            report = json.loads(report_path.read_text())
            if report.get('board_snapshot_sha256') == sha and report.get('finite_element_order') == 2:
                completed.append(name)
    metadata = {
        'board_url': 'https://tscircuit.com/astra/am3352-sbc#pcb',
        'download_endpoint': ENDPOINT,
        'fetched_at_utc': datetime.now(timezone.utc).isoformat(),
        'sha256': sha, 'elements': len(circuit), 'num_layers': board['num_layers'],
        'board_thickness_mm': board['thickness'], 'ground_source_net_id': ground,
        'ddr_trace_count': len(ddr), 'ddr_signal_layers': sorted(layers),
        'ground_pour_layers': sorted(e['layer'] for e in pours),
        'internal_dielectric_thicknesses': 'Not specified by the export; existing layer-depth assumptions are not fabrication data',
        'results_status': 'partial_em_rerun_complete' if completed else 'pending_rerun' if sha != HISTORICAL_SHA else 'historical_snapshot',
        'latest_em_completed_cases': completed,
        'published_results_board_sha256': HISTORICAL_SHA,
        'results_note': ('Latest DDR_D8 isolated transition cases are complete for: ' + ', '.join(completed) + '. 400 MHz, 1 V normalized, provisional accuracy. Historical graph cases and earlier EM cases still use the previous PCB; all 47 signals have not been rerun.' if completed else 'Existing graph and Palace case geometry, contacts, numerical results and images use the previous board. Regenerate geometry and fixtures before rerunning; do not relabel these cached cases as the latest PCB.'),
    }
    (ROOT / 'data/board.circuit.json').write_bytes(content)
    (ROOT / 'data/board-snapshot.json').write_text(json.dumps(metadata, indent=2) + '\n')
    print(json.dumps(metadata, indent=2))

if __name__ == '__main__':
    with urlopen(ENDPOINT, timeout=60) as response:
        update(json.load(response)['preview_circuit_json_response']['circuit_json'])
