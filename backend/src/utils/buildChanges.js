function buildChanges(oldRecord, newRecord, fields) {
    const oldValue = {};
    const newValue = {};
    for (const field of fields) {
        if (oldRecord[field] !== newRecord[field]) {
            oldValue[field] = oldRecord[field];
            newValue[field] = newRecord[field];
        }
    }

    return { oldValue, newValue };

};

module.exports = { buildChanges };