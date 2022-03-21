
let LocalURL = "http://localhost:3000"
let RemoteURL = "https://fullstacknextapp.vercel.app/"
let BaseURL;
if (process.env.NODE_ENV === "development"){
	BaseURL = LocalURL
}else {
	BaseURL = RemoteURL
}

export default BaseURL
