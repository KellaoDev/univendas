class Product {
    static async createProduct(insertData, connection) {
        try {
            const { title, image_base64, whatsapp, price, specification } = insertData;

            const query = `INSERT INTO products (title, image_base64, whatsapp, price, specification)VALUES (?, ?, ?, ?, ?)`;
            const params = [title, image_base64, whatsapp, price, specification];

            const [result] = await connection.query(query, params)

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getAllProducts(connection) {
        try {
            const query = `SELECT * FROM products`;

            const [result] = await connection.query(query);

            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Product;