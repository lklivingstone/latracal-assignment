import React, { useState} from 'react';
import { useEffect } from 'react';
import "./index.css"




const App = () => {

    const [name, setName]= useState("")
    const [roll, setRoll]= useState("")

    const [ data, setData ]= useState([])
    const [ students, setStudents ]= useState(0)

    useEffect(() => {
        const items= JSON.parse(localStorage.getItem("items"))

        if (items) {
            setData(items)
        }
    }, [])

    useEffect(() => {
        let cnt=0
        data?.map((single)=> {
            if (single.checkout==="") {
                cnt= cnt+1
            }
        })
        setStudents(cnt)
    }, [data])



    const handleCheckout= ({name, roll, checkin}) => {
        console.log(name, roll, checkin)
        data.map((single)=> {
            if (single.name===name && single.roll===roll && single.checkin===checkin) {
                const checkoutDate= new Date().toString()
                single.checkout= checkoutDate.split(" ")[4]
                localStorage.setItem("items", JSON.stringify(data))
                setStudents(students-1)
                window.location.reload()
            }
        })
    }

    const Row = (props) => {
        const { name, roll, checkin, checkout } = props

        return (
            <tr>
                <td>{name}</td>
                <td>{roll}</td>
                <td>{checkin}</td>
                <td>{checkout}</td>
                {
                    checkout==="" ? (
                <td>
                    <button onClick={(e)=>handleCheckout({name, roll, checkin})}>Checkout</button>
                </td>

                    ) : (
                        <td>
                            <p></p>
                        </td>
                    )
                }
            </tr>
        )
    }

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(data))
    }, [data])

    const handleSubmit = (e) => {
        const currentTime= new Date().toString()
        const time= currentTime.split(" ")[4]
        const obj= {
            name: name,
            roll: roll,
            checkin: time,
            checkout: ""
        }
        setStudents(students+1)
        setData([...data, obj])
       
    }


    const Table = (props) => {
        const { newData, present }= props 
        return (
            <>
            <table>
                <tbody>
                    <tr>
                        <th>Student</th>
                        <th>Roll Number</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Click to Check-out</th>
                    </tr>
                </tbody>
                <tbody>
                {
                newData.map(row=> {
                    if (row.checkout!=="" && !present) {
                            
                            <Row 
                            key={row.checkin}
                            name={row.name}
                            roll= {row.roll}
                            checkin={row.checkin}
                            checkout={row.checkout}
                            />
                    }
                    else {
                        // console.log(2)

                        return (
                            <Row 
                            key={row.checkin}
                            name={row.name}
                            roll= {row.roll}
                            checkin={row.checkin}
                            checkout={row.checkout}
                            />
                        )
                    }
                })}
                </tbody>
            </table>
                    </>
        )
    }


return (
	<div className="App">
        <form onSubmit={handleSubmit} >
            <br/>
            <label >
                Student's Name:
            </label>
            <br/>
            <input style={{width: "15vw", padding: "5px"}} placeholder="Student Name" onChange={(e)=>setName(e.target.value)} />
            <br/>
            <label>
                Roll Number:
            </label>
            <br/>
            <input style={{width: "15vw", padding: "5px"}} placeholder="Roll Number" onChange={(e)=>setRoll(e.target.value)} />
            <div>
                <button type="submit" >Submit</button>
            </div>
        </form>
        <br />
        <h2>Students Present {students}</h2>
        <Table newData = {data} present={false} />
        <br />

        <h2 style= {{margin: "0"}}  >Every students' record</h2>
        <Table style= {{margin: "0"}} newData = {data} present={true} />
        <br />

	</div>
);
}

export default App;
