class Musician {
  constructor(url) {
    this.albumsUrl = url;
  }

  getAlbums = async () => {
    const response = await fetch(this.albumsUrl);
    return response.json();
  };
}

export default Musician;
