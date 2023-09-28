import { createRef } from 'react';

const ProfileImg = () => {
  const fileInput = createRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('profileImg', fileInput.current.value);
    try {
      const response = await fetch('/profile', {
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
