import { db } from '@/utils/connect'
import { NextResponse } from 'next/server'



export async function GET() {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM words WHERE date_of_display = DATE('now')",
            (err, row) => {
                if (err) {
                    return reject(NextResponse.json({ error: err }, { status: 400 }))
                } 
                if (row) {
                    return resolve(NextResponse.json(row, { status: 200 }))
                }

                db.get(
                    "SELECT * FROM words WHERE date_of_display is NULL ORDER BY RANDOM() LIMIT 1",
                    (err, newWord: {id: string}) => {
                        if (err) {
                            return reject(NextResponse.json({ error: err }, { status: 400 }))
                        } 
                        if (!newWord) {
                            return reject(NextResponse.json({ error: "No new words are left" }, { status: 400 }))
                        }

                        if (process.env.SERVER === "prod") {
                            db.run(
                                "UPDATE words SET date_of_dispay = DATE('now') WHERE id = ?",
                                [newWord.id],
                                (updateErr) => {
                                    if (updateErr) {
                                        return reject(NextResponse.json({ error: err }, { status: 400 }))
                                    }
                                }
                            )
                        }

                        return resolve(NextResponse.json(newWord, { status: 200 }))
                    }
                )
            }
        )
        // db.all(query, (err: Error, rows: any[]) => {
        //     if (err) {
        //         console.error("Database Error: ", err)
        //         reject(NextResponse.json({ error: "Failed to fetch words"}, { status: 400 }))
        //     } else {
        //         console.log("No error in the GET")
        //         resolve(NextResponse.json(rows, { status: 200 }))
        //     }
        // })
    })
}

// const apiGet = async (query: string) => {
//     return await new Promise((resolve, reject) => [
//         db.all(query, (err: Error, row) => {
//             if (err) {
//                 console.log(err)
//                 return reject(err)
//             }
//             return resolve(row)
//         })
//     ])
// }

// const apiPost = async (query: string, values: string[]) => {
//     return await new Promise((resolve, reject) => {
//         db.run(query, values, function(err) {
//             if (err) {
//                 console.log(err)
//                 reject(err)
//             }
//             resolve(null);
//         })
//     })
// }

// export async function GET(req: Request, res: Response) {
//     return Response.json({
//         "message":"this api path is working"
//     })
// }