import { createRef } from 'react';

const ProfileImg = () => {
  const fileInput = createRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImg', fileInput.current.value);
    console.log(formData, fileInput.current.value);
    try {
      const response = await fetch('http://localhost:8000/api/tweet/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('success');
      }
    } catch (err) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="profileImg" ref={fileInput} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default ProfileImg;
