// CODE WITH HOOKS

import React, {useState} from 'react';

function SignIn(props) {
    const {loadUser, onRouteChange, onLoading} = props;
    const [onEmailChange, setOnEmailChange] = useState('');
    const [onPasswordChange, setOnPasswordChange] = useState('');

    const onSubmitSignIn = () => {
        onLoading('true');
        fetch('http://intense-garden-09792.herokuapp.com/signin', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: onEmailChange,
                password: onPasswordChange
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                loadUser(user);
                onRouteChange('home');
                onLoading('false')
            }
            if(user === 'wrong credentials'){
                onLoading('false');
                alert('Incorrect credentials!!');
                onRouteChange('SignIn');
            }
            if(user === 'Error getting user'){
                onLoading('false');
                alert('This User does not exist in our database!, Please Register yourself!');
                onRouteChange('SignIn');
            }
        })
        .catch(err => {
            alert('Error!! Check console.log for more info');
            console.log('Error:', err)
        })
    }

    return (
        <div>
           <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw7 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={(e) => {
                                        setOnEmailChange(e.target.value);
                                    }
                                }
                            />
                            </div>
                            <div className="mv3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={(e) => {
                                        setOnPasswordChange(e.target.value);
                                    }
                                }
                            />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                type="submit" 
                                value="Sign in" 
                                onClick={onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} href="#0" className="f5 link grow black db pointer">Register yourself!</p>
                        </div>
                    </div>
                </main>   
            </article> 
        </div>
    )
}

// CODE WITHOUT HOOKS

// class SignIn extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             onEmailChange: '',
//             onPasswordChange: ''
//         }
//     }

//     onEmailChange = (e) => {
//         this.setState({signInEmail: e.target.value})
//     }

//     onPasswordChange = (e) => {
//         this.setState({signInPassword: e.target.value})
//     }
 
//     onSubmitSingIn = () => {
//         this.props.onLoading('true');
//         fetch('http://intense-garden-09792.herokuapp.com/signin', {
//             method: 'post',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: this.state.signInEmail,
//                 password: this.state.signInPassword
//             })
//         })
//         .then(response => response.json())
//         .then(user => {
//             if(user.id) {
//                 this.props.loadUser(user);
//                 this.props.onRouteChange('home');
//                 this.props.onLoading('false')
//             }
//             if(user === 'wrong credentials'){
//                 this.props.onLoading('false');
//                 alert('Incorrect credentials!!');
//                 this.props.onRouteChange('SignIn');
//             }
//             if(user === 'Error getting user'){
//                 this.props.onLoading('false');
//                 alert('This User does not exist in our database!, Please Register yourself!');
//                 this.props.onRouteChange('SignIn');
//             }
//         })
//     } 

//     render() {
//         const { onRouteChange } = this.props;
//         return (
//             <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
//                 <main className="pa4 black-80">
//                     <div className="measure">
//                         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                             <legend className="f1 fw7 ph0 mh0">Sign In</legend>
//                             <div className="mt3">
//                             <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
//                             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="email" 
//                                 name="email-address" 
//                                 id="email-address"
//                                 onChange={this.onEmailChange}
//                             />
//                             </div>
//                             <div className="mv3">
//                             <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
//                             <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="password" 
//                                 name="password" 
//                                 id="password" 
//                                 onChange={this.onPasswordChange}
//                             />
//                             </div>
//                         </fieldset>
//                         <div className="">
//                             <input className="b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
//                                 type="submit" 
//                                 value="Sign in" 
//                                 onClick={this.onSubmitSingIn}
//                             />
//                         </div>
//                         <div className="lh-copy mt3">
//                             <p onClick={() => onRouteChange('register')} href="#0" className="f5 link grow black db pointer">Register yourself!</p>
//                         </div>
//                     </div>
//                 </main>   
//             </article>
//         )
//     }
// }

export default SignIn;