const registerUser = async (db, name, batch, phoneNumber, whatsappNumber, email, occupation, suggestion, remarks, activeAreas, joiningCommittee, referral, password, address) => {
    const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUserResult = await db.query(existingUserQuery, [email]);
    const existingUser = existingUserResult.rows[0];
  
    if (existingUser) {
      return null
    }
  
    const insertUserQuery = `
      INSERT INTO users (name, batch, phone_number, whatsapp_number, email, occupation, suggestion, remarks, active_areas, joining_committee, referral, password, address, approved, admin)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
  
    const insertedUserResult = await db.query(insertUserQuery, [
      name,
      batch,
      phoneNumber,
      whatsappNumber,
      email,
      occupation,
      suggestion,
      remarks,
      activeAreas,
      joiningCommittee,
      referral,
      password,
      address,
      false,
      false,
    ]);
  
    const user = insertedUserResult.rows[0];
  
    return user;
  };
  
  module.exports = {
    registerUser,
  };
  