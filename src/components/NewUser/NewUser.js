
const NewUser = (props) => {

    const URL = props.location.pathname.split("/");
    console.log(URL);
    const token = URL[URL.length-1];
    console.log(token);
    
    return (
        <div>
            NewUser
        </div>
    )
}

export default NewUser;