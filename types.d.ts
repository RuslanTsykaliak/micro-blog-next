type Post = {
    _id: string;
    title: string;
    description: string;
    owner: string;
    comments: [];
  };
  
  type InputsLogin = {
    email: string;
    password: string;
  };
  
  type InputsRegister = {
    email: string;
    password: string;
    role: string;
  };
  