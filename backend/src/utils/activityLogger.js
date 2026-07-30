const createActivityLog = async ({
    entityId,
    entityType,
    changedBy,
    action,
    oldValue = null,
    newValue = null
}) => {
    await pool.query(`
    INSERT INTO
    activity_logs(  
            entity_id,
            entity_type,
            changed_by,
            action,
            old_value,
            new_value)
    VALUES(
    $1,$2,$3,$4,$5,$6
    )`, [entityId,
        entityType,
        changedBy,
        action,
        oldValue,
        newValue]);


};

module.exports = { createActivityLog };