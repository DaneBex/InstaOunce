


const UserEditForm = () => {
    
    return(
        <form>
            <div className='form'>
                {/* <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div> */}
                <div className='input'>
                    <input
                    name='username'
                    type='text'
                    placeholder='Username'  
                    />
                </div>
                <button>Edit</button>
            </div>
        </form>
    )
}

export default UserEditForm;

