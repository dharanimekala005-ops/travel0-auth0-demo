import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Profile from './Profile'

export default function App() {
  const { isAuthenticated, isLoading, error, loginWithRedirect, logout } = useAuth0()

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-state">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    )
  }

  // Normalize all possible error text into one lowercased string
  const errText = [
    (error as any)?.error,
    (error as any)?.error_description,
    (error as any)?.message,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  // Robust detection of the unverified-email denial
  const isEmailNotVerified =
    errText.includes('email_not_verified') ||
    /verify\s+your\s+email/.test(errText) ||
    (/access_denied/.test(errText) && /verify/.test(errText))

  return (
    <div className="app-container">
      {/* If we have the unverified-email case, show a recoverable banner */}
      {error && isEmailNotVerified && (
        <div className="error-state" style={{ marginBottom: 16 }}>
          <div className="error-title">Error: We need to verify your email</div>
          <div className="error-message">
            We sent a verification link to your email. Click it, then return here.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
            <button className="button login" onClick={() => loginWithRedirect()}>
              I’ve verified — Continue
            </button>
            <button
              className="button logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Back to sign in
            </button>
          </div>
        </div>
      )}

      {/* If we have some other error, show a generic banner but keep the app usable */}
      {error && !isEmailNotVerified && (
        <div className="error-state" style={{ marginBottom: 16 }}>
          <div className="error-title">Oops!</div>
          <div className="error-message">Something went wrong</div>
          <div className="error-sub-message">
            {(error as any)?.error_description || (error as any)?.message}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
            <button className="button login" onClick={() => loginWithRedirect()}>
              Try again
            </button>
            <button
              className="button logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Back to sign in
            </button>
          </div>
        </div>
      )}

      <div className="main-card-wrapper">
        <img
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
          alt="Auth0 Logo"
          className="auth0-logo"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <h1 className="main-title">Welcome to Cruise0</h1>

        {isAuthenticated ? (
          <div className="logged-in-section">
            <div className="logged-in-message">✅ Successfully authenticated!</div>
            <h2 className="profile-section-title">Your Profile</h2>
            <div className="profile-card">
              <Profile />
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="action-card">
            <p className="action-text">Get started by signing in to your account</p>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  )
}
