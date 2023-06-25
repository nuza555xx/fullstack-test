import { useRouter } from 'next/router';
import CustomFooter from './footer';
import CustomHeader from './header';
import { Box } from '@mui/material';

type LayoutProps = {
    children: React.ReactNode;
};

export default function CustomLayout({ children }: LayoutProps) {
    const router = useRouter();
    const isAuthPage = ['/login', '/register'].includes(router.pathname);

    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            {isAuthPage ? null : <CustomHeader />}
            <main className='page-container'>{children}</main>
            <CustomFooter />
        </Box>
    );
}
