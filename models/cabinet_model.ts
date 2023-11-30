import connection from '../dataBase';
import { RowDataPacket } from 'mysql2';

const cabinet = {
    // Get list of free cabinets for a selected locker location
    getAllCabinets: async (lockerNumber: number) => {
        try {
            const query = `SELECT * FROM locker WHERE locker_number = ?`;
            const result = await connection.promise().query<RowDataPacket[]>(query, [lockerNumber]);
            
            return result[0];
        }
        catch (e: any) {
            console.error(e.message);
            return `Error from cabinet model: ${e.message}`;
        }
    }
};

export default cabinet;