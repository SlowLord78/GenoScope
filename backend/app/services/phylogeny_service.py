def generer_arbre_phylogenetique(alignement):
    items = alignement["items"]

    if len(items) < 2:
        return {
            "nodes": [],
            "edges": [],
        }

    labels = [item["id"] for item in items]

    nodes = []
    edges = []

    for index, label in enumerate(labels):
        nodes.append({
            "id": label,
            "label": label,
            "group": "sequence",
        })

        if index > 0:
            distance = round(100 - items[index]["identity"], 2)

            edges.append({
                "source": labels[0],
                "target": label,
                "distance": distance,
            })

    return {
        "method": "Reference-based distance tree",
        "nodes": nodes,
        "edges": edges,
    }