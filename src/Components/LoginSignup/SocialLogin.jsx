import React from 'react';
import google_icon from '../Assets/google.jpeg';
import facebook_icon from '../Assets/facebook.png';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import FacebookLogin from '@greatsumini/react-facebook-login'; // Use only this Facebook login package

export const SocialLogin = () => {
  // Google Login Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const decodedCredential = jwtDecode(credentialResponse.credential);
      console.log('Google Login Success:', decodedCredential);
      // Handle successful Google login (e.g., redirect to homepage, set user data)
    },
    onError: () => {
      console.log('Google Login Failed');
      // Handle Google login error (e.g., display error message)
    },
  });

  // Facebook Login Handler
  const handleFacebookLogin = (response) => {
    if (response.status !== 'unknown') {
      console.log('Facebook Login Success:', response);
      // Handle successful Facebook login (e.g., redirect to homepage, set user data)
    } else {
      console.log('Facebook Login Failed');
      // Handle Facebook login error (e.g., display error message)
    }
  };

  return (
    <div className="social-login">
      {/* Google Login Button */}
      <button className="social-button" onClick={handleGoogleLogin}>
        <img src={google_icon} alt="Google" className="social-icon" />
        Google
      </button>

      {/* Facebook Login Button */}
      <FacebookLogin
        appId="1169935998232824" // Replace with your Facebook App ID
        onSuccess={(response) => handleFacebookLogin(response)} // Success callback
        onFail={(error) => console.log('Facebook Login Failed:', error)} // Error callback
        render={({ onClick }) => (
          <button className="social-button" onClick={onClick}>
            <img src={facebook_icon} alt="Facebook" className="social-icon" />
            Facebook
          </button>
        )}
      />
    </div>
  );
};
