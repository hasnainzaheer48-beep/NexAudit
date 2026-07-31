function buildChanges(oldRecord, newRecord, fields) {
    oldValue = {};
    newValue = {};
    for (const field of fields) {
        if (oldRecord[field] !== newRecord[field]) {
            oldValue[field] = oldRecord[field];
            newValue[field] = newValue[field];
        }
    }

    return { oldValue, newValue };

};

module.exports = { buildChanges };