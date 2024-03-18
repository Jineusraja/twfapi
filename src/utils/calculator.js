exports.calculateCost = (order) => {
    const productDetails = {
        A: { weight: 3, center: 'C1' },
        B: { weight: 2, center: 'C1' },
        C: { weight: 8, center: 'C1' },
        D: { weight: 12, center: 'C2' },
        E: { weight: 25, center: 'C2' },
        F: { weight: 15, center: 'C2' },
        G: { weight: 0.5, center: 'C3' },
        H: { weight: 1, center: 'C3' },
        I: { weight: 2, center: 'C3' },
    };

    // Distances to and from L1
    const distances = { 
        C1: { toL1: 3 }, 
        C2: { toL1: 2.5 }, 
        C3: { toL1: 2 },
        L1: { toC1: 3, toC2: 2.5, toC3: 2 } // For clarity, even though they are the same
    };

    const baseCostPerUnitDistance = 10;
    const additionalCostPerUnitDistance = 8;

    let centerWeights = { C1: 0, C2: 0, C3: 0 };

    // Aggregate weights by center based on the order
    Object.keys(order).forEach(item => {
        const { weight, center } = productDetails[item];
        centerWeights[center] += weight * order[item];
    });

    let totalCost = 0;

    // Calculate base and additional delivery cost for each center
    Object.entries(centerWeights).forEach(([center, weight]) => {
        if (weight === 0) return;

        const distanceToL1 = distances[center].toL1;
        const baseDeliveryCost = distanceToL1 * baseCostPerUnitDistance;

        // Round trip cost for this center, if applicable
        const roundTripCost = distances.L1[`to${center}`] * baseCostPerUnitDistance;

        // Additional weight cost
        let additionalWeightCost = 0;
        if (weight > 5) {
            const additionalUnits = Math.ceil((weight - 5) / 5);
            additionalWeightCost = additionalUnits * additionalCostPerUnitDistance * distanceToL1;
        }

        totalCost += baseDeliveryCost + roundTripCost + additionalWeightCost;
    });

    // Subtract one round trip since the last trip back to L1 is unnecessary
    const lastTripCost = Math.min(...Object.values(distances.L1).map(dist => dist * baseCostPerUnitDistance));
    totalCost -= lastTripCost;
    totalCost-=baseCostPerUnitDistance
    return totalCost;
};
