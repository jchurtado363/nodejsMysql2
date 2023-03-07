//import Pool from "mysql2/typings/mysql/lib/Pool.js";
import { pool } from "../db.js";


//CONSULTA TODOS LOS DATOS DE LA TABLA 
export const getEmployees = async (req, res) => {

    try {
        //throw new Error ('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM  employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ menssage: 'Algo salio mal' })
    }
}

//CONSULTA SOLO LOS DE DATOS CON EL ID ORDENADO
export const getEmployee = async (req, res) => {

    try {
        //throw new Error ('DB ERROR')

        const [rows] = await pool.query('SELECT * FROM  employee WHERE id=?', [req.params.id])

        if (rows.length <= 0) return res.status(400).json({ menssage: 'Employ not found ' })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ menssage: 'Algo salio mal' })
    }

}



//CREA UN CAMPO EN LA TABLA EN ESTE CASO UN EMPLEADO
export const CreateEmployees = async (req, res) => {

    const { name, salary } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO employee (name,salary) VALUES (?,?)', [name, salary])
        console.log
        res.send({
            id: rows.insertId,
            name,
            salary,
        })
    }

    catch (error) {
        return res.status(500).json({ menssage: 'Algo salio mal' })
    }


}

//ACTUALIZA EN LA TABLA 
export const UpdateEmployees = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body

    try {

        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id])
        if (result.affectedRows === 0) return res.status(404).json({ menssage: 'Employee not found' })

        const [rows] = await pool.query('SELECT * FROM  employee WHERE id = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ menssage: 'Algo salio mal' })
    }

}




//ELIMINA CAMPOS EN LA TABLA CON ID ORDENADO
export const DeleteEmployees = async (req, res) => {
    try {
        //throw new Error ('DB ERROR')
        const [result] = await pool.query('DELETE FROM  employee WHERE id= ?', [req.params.id])

        if (result.affectedRows <= 0) return res.status(400).json({ menssage: 'Employee not found ' })


        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ menssage: 'Algo salio mal' })
    }


}

