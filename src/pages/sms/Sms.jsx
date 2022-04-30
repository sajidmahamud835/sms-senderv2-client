import Form from "../../components/form/Form";
import "./sms.css"


const Sms = () => {
    return (
        <section className="sms m-3 p-3 shadow rounded">
            <h1 className="text-center mt-5 text-primary">Send Bulk Message</h1>
            <Form />
        </section>
    );
};

export default Sms;