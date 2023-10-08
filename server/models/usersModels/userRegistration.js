import bcrypt from 'bcryptjs';
import connection from '../../configs/dbConfig';
import ROLES from '../../configs/constantes';
// TODO move to sequalize migrations
const userRegistration = () => {
  const adminName = 'Admin';
  const password = '12345';
  const role = ROLES.ADMIN;
  const hashPassword = bcrypt.hashSync(password, 7);

  connection.query(
    `INSERT INTO users (name,password,role) VALUES ('${adminName}', '${hashPassword.toString()}','${role}')`,
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('error');
        return;
      }
      // eslint-disable-next-line no-console
      console.log('created user');
    },
  );
};
export default userRegistration;
