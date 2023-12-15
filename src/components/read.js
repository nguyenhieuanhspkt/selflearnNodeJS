import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Input  } from 'semantic-ui-react';
export default function Read() {
    const [searchTerm, setSearchTerm] = useState('');

    const [APIData, setAPIData] = useState([]);
    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)

        console.log(data);
     }
     const getData = () => {
        axios.get(`https://657b8e49394ca9e4af147ca2.mockapi.io/LearnReact/v1/users`)
        .then((getData) => {
            setAPIData(getData.data);
        })

     }
     const onDelete = (id) => {
        axios.delete(`https://657b8e49394ca9e4af147ca2.mockapi.io/LearnReact/v1/users/${id}`)
        .then(()=>{
            getData();
        })

     }
     

    useEffect(() => {
        axios.get(`https://657b8e49394ca9e4af147ca2.mockapi.io/LearnReact/v1/users`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    // Function to filter data based on search term
    const filteredAPIData = APIData.filter((data) => {
        return (
          data.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    

    
    return (
        

        
        <div className = "read-container">
            <div className = "leftAlign">
            <Link to='/create'>
             <Button>Add new</Button>
             </Link>
             </div>
             <div className = "rightAlign">
             <Input
                icon="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>


            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>


                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredAPIData.map((data)=>{
                        return(
                            <Table.Row key={data.id}>
                            <Table.Cell>
                                {data.firstName}
                            </Table.Cell>
                            <Table.Cell>
                                {data.lastName}
                            </Table.Cell>
                            <Table.Cell>
                                {data.checkbox ? 'Checked' : 'Unchecked'}
                            </Table.Cell>
                            <Table.Cell>
                                <Link to='/update'>
                                    <Button onClick={()=>setData(data)}>Update</Button>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                    <Button onClick={()=>onDelete(data.id)}>Delete</Button>
                            </Table.Cell>

                        </Table.Row>                        
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
