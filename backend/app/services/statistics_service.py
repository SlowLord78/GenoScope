def calculer_statistiques_globales(alignement):
    items = alignement["items"]

    longueurs = [len(item["aligned_sequence"]) for item in items]
    identites = [
        item["identity"]
        for item in items
        if item["identity"] is not None
    ]

    mutations = calculer_mutations(items)
    matrice = calculer_matrice_similarite(items)

    return {
        "sequence_count": len(items),
        "alignment_length": max(longueurs) if longueurs else 0,
        "average_identity": round(sum(identites) / len(identites), 2) if identites else 0,
        "total_gaps": sum(item["gaps"] for item in items),
        "mutation_count": len(mutations),
        "mutations": mutations[:500],
        "similarity_matrix": matrice,
    }


def calculer_mutations(items):
    if not items:
        return []

    reference = items[0]["aligned_sequence"]
    mutations = []

    for item in items[1:]:
        sequence = item["aligned_sequence"]

        for position, (ref_base, base) in enumerate(zip(reference, sequence), start=1):
            if ref_base != base:
                mutations.append({
                    "sequence_id": item["id"],
                    "position": position,
                    "reference": ref_base,
                    "observed": base,
                    "mutation": f"{ref_base}{position}{base}",
                })

    return mutations


def calculer_matrice_similarite(items):
    labels = [item["id"] for item in items]
    matrix = []

    for item_a in items:
        ligne = []

        for item_b in items:
            ligne.append(calculer_identite_simple(
                item_a["aligned_sequence"],
                item_b["aligned_sequence"],
            ))

        matrix.append(ligne)

    return {
        "labels": labels,
        "values": matrix,
    }


def calculer_identite_simple(seq_a, seq_b):
    longueur = min(len(seq_a), len(seq_b))

    if longueur == 0:
        return 0.0

    identiques = 0
    compares = 0

    for a, b in zip(seq_a, seq_b):
        if a == "-" and b == "-":
            continue

        compares += 1

        if a == b:
            identiques += 1

    if compares == 0:
        return 0.0

    return round((identiques / compares) * 100, 2)