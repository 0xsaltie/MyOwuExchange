import { BrowserRouter, Routes, Route } from "react-router-dom";
 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import AddListing from "./pages/AddListing";
import TestAuth from "./pages/TestAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import MyListings from "./pages/MyListings";
import EditListing from "./pages/EditListing";
import Notifications from "./pages/Notifications";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import EditProfile from "./pages/EditProfile";
import ListingDetails from "./pages/ListingDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/test" element={<TestAuth />} />
        <Route path="/add-listing" element={<ProtectedRoute><AddListing /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
        <Route path="/edit-listing/:id" element={<ProtectedRoute><EditListing /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/listingdetails/:id" element={<ListingDetails />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;