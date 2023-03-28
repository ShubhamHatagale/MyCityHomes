import React,{useState} from 'react'
import Forms from './components/Forms'
import { Form } from '@themesberg/react-bootstrap';
import { Button } from '@themesberg/react-bootstrap';
import Axios from 'axios';

function AboutUs() {
  const [name, setName] = useState('')

    const Register = () => {
    Axios.post("http://localhost:3002/addAboutUs", {
      name: name,
    }).then((response) => {
      if (response.data.message) {
        console.log(response)
      } else {
        console.log("Registered Successfully")
        // window.location.href='#/dashboard/overview'
        // sessionStorage.setItem('id', response.data[0].id.toString());
        // console.log(response.data[0].id.toString())
        console.log(response)
      }

    });
  }
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>About Us</Form.Label>
                <Form.Control as="textarea" rows="3"
                    onChange={e => setName(e.target.value)} value={name}
                    placeholder='About Us Text' />
            </Form.Group>
            <div className="mt-3">
                <Button variant="primary" onClick={Register} >Save</Button>
            </div>
        </Form>
    )
}

export default AboutUs
