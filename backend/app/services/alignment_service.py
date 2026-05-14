from Bio.Align import PairwiseAligner

def calculer_score_alignement(seq_a: str, seq_b: str) -> float:
    score = 0.0

    for a, b in zip(seq_a, seq_b):
        if a == "-" or b == "-":
            score -= 2
        elif a == b:
            score += 2
        else:
            score -= 1

    return score


def aligner_sequences(sequences):
    reference = sequences[0]
    reference_sequence = reference["sequence"]

    aligner = PairwiseAligner()
    aligner.mode = "global"
    aligner.match_score = 2
    aligner.mismatch_score = -1
    aligner.open_gap_score = -5
    aligner.extend_gap_score = -1

    alignements = []

    alignements.append({
        "id": reference["id"],
        "description": reference["description"],
        "aligned_sequence": reference_sequence,
        "score": None,
        "identity": 100.0,
        "gaps": reference_sequence.count("-"),
        "is_reference": True,
    })

    for sequence in sequences[1:]:
        resultat = aligner.align(reference_sequence, sequence["sequence"])[0]

        ref_alignee, seq_alignee = reconstruire_alignement(
            reference_sequence,
            sequence["sequence"],
            resultat.aligned,
        )

        score_alignement = calculer_score_alignement(ref_alignee, seq_alignee)
        identite = calculer_identite(ref_alignee, seq_alignee)

        alignements.append({
            "id": sequence["id"],
            "description": sequence["description"],
            "aligned_sequence": seq_alignee,
            "reference_aligned": ref_alignee,
            "score": round(score_alignement, 2),
            "identity": identite,
            "gaps": seq_alignee.count("-"),
            "is_reference": False,
        })

    alignements = normaliser_longueur_alignements(alignements)

    return {
        "reference_id": reference["id"],
        "method": "Needleman-Wunsch global alignment",
        "count": len(alignements),
        "items": alignements,
    }


def reconstruire_alignement(reference_sequence, sequence, blocs_alignement):
    blocs_ref, blocs_seq = blocs_alignement

    ref_alignee = []
    seq_alignee = []

    position_ref = 0
    position_seq = 0

    for (debut_ref, fin_ref), (debut_seq, fin_seq) in zip(blocs_ref, blocs_seq):
        while position_ref < debut_ref:
            ref_alignee.append(reference_sequence[position_ref])
            seq_alignee.append("-")
            position_ref += 1

        while position_seq < debut_seq:
            ref_alignee.append("-")
            seq_alignee.append(sequence[position_seq])
            position_seq += 1

        while position_ref < fin_ref and position_seq < fin_seq:
            ref_alignee.append(reference_sequence[position_ref])
            seq_alignee.append(sequence[position_seq])
            position_ref += 1
            position_seq += 1

    while position_ref < len(reference_sequence):
        ref_alignee.append(reference_sequence[position_ref])
        seq_alignee.append("-")
        position_ref += 1

    while position_seq < len(sequence):
        ref_alignee.append("-")
        seq_alignee.append(sequence[position_seq])
        position_seq += 1

    return "".join(ref_alignee), "".join(seq_alignee)


def calculer_identite(seq_a: str, seq_b: str) -> float:
    positions_valides = 0
    identiques = 0

    for a, b in zip(seq_a, seq_b):
        if a == "-" and b == "-":
            continue

        positions_valides += 1

        if a == b:
            identiques += 1

    if positions_valides == 0:
        return 0.0

    return round((identiques / positions_valides) * 100, 2)


def normaliser_longueur_alignements(alignements):
    longueur_max = max(len(item["aligned_sequence"]) for item in alignements)

    for item in alignements:
        sequence = item["aligned_sequence"]

        if len(sequence) < longueur_max:
            item["aligned_sequence"] = sequence + "-" * (longueur_max - len(sequence))

    return alignements