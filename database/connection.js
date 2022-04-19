import { enablePromise, openDatabase } from 'react-native-sqlite-storage';
const tableName = 'reminderList';

enablePromise(true);


export const getDBConnection = async () => {
    return openDatabase({ name: 'oblifi.db', location: 'default' });
};

export const createTable = async (db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          id INTEGER PRIMARY KEY,
          text TEXT NOT NULL,
          apName TEXT NOT NULL
      );`;

    const result = await db.executeSql(query);
    if(result){
      console.log('table created successfully',result)
    }
};

export const getReminderList = async (db,apName) => {
    try {
      const reminderItems = [];
      console.log('apName',apName)
      const results = await db.executeSql(`SELECT * FROM ${tableName} WHERE apName=="${apName}"`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
            console.log(result.rows.item(index))
            reminderItems.push(result.rows.item(index))
        }
      });
      return reminderItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get reminderItems !!!');
    }
  };
export const getAllReminderList = async(db)=>{
  try {
    const reminderItems = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
          reminderItems.push(result.rows.item(index))
      }
    });
    return reminderItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get reminderItems !!!');
  }
}
  
  export const saveReminderItems = async (db, reminderItems) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(rowid, text, apName) values` +
      reminderItems.map(i => `(${i.id}, '${i.text}', '${i.apName}' )`).join(',');
  
    return db.executeSql(insertQuery);
  };
  
  export const deleteReminderItem = async (db, id) => {
    const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
    await db.executeSql(deleteQuery);
  };
  
  export const deleteTable = async (db) => {
    const query = `drop table ${tableName}`;
  
    await db.executeSql(query);
    console.log('success')
  };