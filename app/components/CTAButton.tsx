import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary';
}

export default function CTAButton({ href, text, variant = 'primary' }: CTAButtonProps) {
  const baseClasses = 'inline-block px-8 py-3 rounded-lg font-semibold transition';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {text}
    </Link>
  );
}
