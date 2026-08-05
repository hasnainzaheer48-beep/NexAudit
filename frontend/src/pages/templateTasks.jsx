import { useParams } from "react-router-dom";



export default function TemplateTasks() {

    const { templateId } = useParams();

    return (

        <h1> Template Tasks of id {templateId}</h1>

    );
}