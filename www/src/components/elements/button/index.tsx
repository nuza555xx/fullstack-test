import { Theme } from '@emotion/react';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system';
import { MouseEventHandler, ReactNode } from 'react';

class ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode | string = '';
    variant?: 'text' | 'outlined' | 'contained' | undefined;
    color?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning'
        | undefined;
    disabled?: boolean;
    startIcon?: ReactNode | undefined;
    sx?: SxProps<Theme> | undefined;
    type: 'button' | 'submit' | 'reset' | undefined;
}

export default function CustomButton({
    onClick,
    children,
    variant,
    color,
    disabled,
    startIcon,
    sx,
    type,
}: ButtonProps) {
    return (
        <Button
            type={type}
            sx={sx}
            onClick={onClick}
            variant={variant}
            color={color}
            disabled={disabled}
            startIcon={startIcon}
        >
            {children}
        </Button>
    );
}
