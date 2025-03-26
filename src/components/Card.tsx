interface User {
  id: number;
  name: string;
  talent: string;
  profilepic: string; // ✅ Added profile picture
  userid: string; // ✅ Added user ID
}

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <div
      className="card border-1 p-2.5 w-64 scale-[0.98] shadow-md bg-white transition-transform duration-300 ease-in-out transform hover:scale-100"
      style={{
        width: "18rem",
        height: "362px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <img
        src={user.profilepic}
        className="card-img-top"
        alt={user.name}
        style={{
          height: "58%",
          objectFit: "cover",
        }}
      />
      <div
        className="card-body"
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h5
          className="card-title"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user.name}
        </h5>
        <p
          className="card-text"
          style={{
            fontSize: "0.9rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {user.talent}
        </p>
        <a
          href={`/Profile/${user.userid}`}
          className="btn btn-primary btn-sm"
          style={{ alignSelf: "flex-start" }}
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default Card;
