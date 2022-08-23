import React from 'react';
import './styles.scss';

export default function UserIcon({ userName }: {userName: string}) {
  return (
    <div className="initials">
      {userName.match(/\b(\w)/g)!.join('')}
    </div>
  );
}
