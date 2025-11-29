'use client';

interface PasswordRequirementsProps {
  password: string;
}

export default function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'One special character (@$!%*?&)', test: (pwd: string) => /[@$!%*?&]/.test(pwd) },
  ];

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-md">
      <p className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</p>
      <ul className="space-y-1">
        {requirements.map((req, index) => {
          const isValid = req.test(password);
          return (
            <li key={index} className="flex items-center text-sm">
              <span className={`mr-2 font-bold ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                {isValid ? '✓' : '✗'}
              </span>
              <span className={isValid ? 'text-gray-700' : 'text-gray-400'}>
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

