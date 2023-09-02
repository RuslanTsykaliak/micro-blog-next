import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { supabase } from './supabase'; // Import your Supabase configuration
import { useRouter } from 'next/router';

type AuthFormValues = {
  email: string;
  password: string;
};

const Auth = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<AuthFormValues>();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const loginMutation = useMutation(async (formData: AuthFormValues) => {
    const { user, error } = await supabase.auth.signIn({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return user;
  });

  const signupMutation = useMutation(async (formData: AuthFormValues) => {
    const { user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return user;
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (formData) => {
    try {
      if (open) {
        if (loginMutation.isLoading || signupMutation.isLoading) {
          return;
        }

        if (router.asPath.includes('/auth/login')) {
          await loginMutation.mutateAsync(formData);
        } else {
          await signupMutation.mutateAsync(formData);
        }

        // Handle the result as needed (e.g., redirect to the home page)
        handleClose();
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{router.asPath.includes('/auth/login') ? 'Login' : 'Sign Up'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
            disabled={loginMutation.isLoading || signupMutation.isLoading}
          >
            {router.asPath.includes('/auth/login') ? 'Login' : 'Sign Up'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Auth;
