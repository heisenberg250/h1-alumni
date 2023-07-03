const getAllUsers = async (db) => {
    const query = 'SELECT * FROM users';
    const result = await db.query(query);
    const users = result.rows;
  
    return users;
  };
  
  const approveUser = async (db, userId) => {
    const updateQuery = 'UPDATE users SET approved = true WHERE id = $1';
    await db.query(updateQuery, [userId]);
  };
  
  module.exports = {
    getAllUsers,
    approveUser,
  };
  