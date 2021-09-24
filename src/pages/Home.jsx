import Tab from "../components/Tab";
import useDocumentTitle from "../hooks/useDocumentTitle";
const Home = () => {

    const [document_title, setDoucmentTitle] = useDocumentTitle(` Home | Admin Templates`);
  return (
    <div>
       <Tab tab={0} />
   
      <h1 style={{ marginTop:60}}>Home</h1>
      
    </div>
  );
};

export default Home;
