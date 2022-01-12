//CODE WITH HOOKS

import React, {useState} from 'react';


function Register(props) {
    const {loadUser, onLoading, onRouteChange} = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitRegister = () => {
        onLoading('true');
        // intense-garden-09792.herokuapp.com
        fetch('http://intense-garden-09792.herokuapp.com/register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(response => response.json())
        .then(user => {
            loadUser(user);
            onLoading('false');
            if(user.id) {
                onRouteChange('home')
            }

        })
    }

    return (
        <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Registration</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="usernname">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="username"  
                            id="username"
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
    
                    </fieldset>
                    <div className="">
                        <input className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                            type="submit" 
                            value="Register" 
                            onClick={onSubmitRegister}
                        />
                    </div>
                </div>
            </main>   
        </article>
        </div>
    )
}

export default Register;


// CODE WITHOUT HOOKS

// import React from 'react';

// class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             name: ''
//         }
//     }

//     onNameEntry = (e) => {
//         this.setState({ name: e.target.value })
//     }
    
//     onEmailEntry = (e) => {
//         this.setState({ email: e.target.value })
//     }

//     onPasswordEntry = (e) => {
//         this.setState({ password: e.target.value })
//     }

//     onSubmitRegister = () => {
//         this.props.onLoading('true');
//         // intense-garden-09792.herokuapp.com
//         fetch('http://intense-garden-09792.herokuapp.com/register', {
//             method: 'post',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: this.state.email,
//                 password: this.state.password,
//                 name: this.state.name
//             })
//         })
//         .then(response => response.json())
//         .then(user => {
//             this.props.loadUser(user);
//             this.props.onLoading('false');
//             if(user.id) {
//                 this.props.onRouteChange('home')
//             }

//         })
//     }

//     render() {
//         return (
//             <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//                 <main className="pa4 black-80">
//                     <div className="measure">
//                         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                             <legend className="f1 fw6 ph0 mh0">Registration</legend>
//                             <div className="mt3">
//                             <label className="db fw6 lh-copy f5" htmlFor="usernname">Name</label>
//                             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="text" 
//                                 name="username"  
//                                 id="username"
//                                 onChange={this.onNameEntry}
//                             />
//                             </div>
//                             <div className="mt3">
//                             <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
//                             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="email" 
//                                 name="email-address"  
//                                 id="email-address" 
//                                 onChange={this.onEmailEntry}
//                             />
//                             </div>
//                             <div className="mv3">
//                             <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
//                             <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="password" 
//                                 name="password"  
//                                 id="password"
//                                 onChange={this.onPasswordEntry}
//                             />
//                             </div>
        
//                         </fieldset>
//                         <div className="">
//                             <input className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
//                                 type="submit" 
//                                 value="Register" 
//                                 onClick={this.onSubmitRegister}
//                             />
//                         </div>
//                     </div>
//                 </main>   
//             </article>
//         )
//     }
   
// }

// export default Register;