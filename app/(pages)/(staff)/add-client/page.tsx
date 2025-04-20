import AddUsersLayout from '../../../(components)/add-client/AddUsersLayout';
import UserCard from '../../../(components)/add-client/UserCard';


export default function AddUsersPage() {
  return (
    <AddUsersLayout>
      <UserCard isAddButton />
      {Array.from({ length: 7 }).map((_, i) => (
        <UserCard key={i} />
      ))}
    </AddUsersLayout>
  );
}

