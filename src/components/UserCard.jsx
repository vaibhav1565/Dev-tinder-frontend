const UserCard = ({userData, showButton = true}) => {
  const { firstName, lastName, photoUrl, about, age, gender } = userData;
  return (
    <div className="card card-compact bg-base-300 w-80 shadow-xl">
      <figure>
        <img src={photoUrl} alt="user" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age && gender && age + "," + gender}</p>
        <div className="card-actions justify-center">
          {showButton && <button className="btn btn-primary">Ignore</button>}
          {showButton && <button className="btn btn-secondary">Interested</button>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;