export class Picture {
  pictureId: string;
  likes: number;
  width: number;
  height: number;
  url: string;
  availableAssets: string[] = []
  filteredAssets: string[] = []

  constructor(pictureId: string, width: number, height: number, url: string, likes: number) {
      this.pictureId = pictureId;
      this.width = width;
      this.height = height;
      this.url = url;
      this.likes = likes;
  }

  public addAvailableAsset(asset:string):void {
    this.availableAssets.push(asset);
  }
  public addFilteredAsset(asset:string):void {
    this.filteredAssets.push(asset);
  }

}
