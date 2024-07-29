const validateUser = (req, res, next) => {
    const { username, email, password, cpassword } = req.body;
  
    if (!username || !email || !password || !cpassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    if (password !== cpassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    next();
  };
  
  export default validateUser;
  