function InputBox({label,setAttribute}){
return(
<main className='App'>
    <div className='user-input-main'>
    <label className='label-main'>{label}</label>
    <input 
    className='input-main'
    onChange = {(e)=> setAttribute(e.target.value)}/>
    </div>
   
   </main>
);
}

export default InputBox;