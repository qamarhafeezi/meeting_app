using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using WebAPI.Helpers;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class PhotoService : IPhotoService
    {
        private Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> options)
        {
            var acc = new Account(options.Value.CloudName, options.Value.APIKey,
            options.Value.APISecret);
            _cloudinary = new Cloudinary(acc);

        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams();
                uploadParams.File = new FileDescription(file.Name, stream);
                uploadParams.Transformation = new Transformation().Width(600).Height(600).
                Crop("fill").Gravity("face");
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;

        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var delResult = await _cloudinary.DestroyAsync(deleteParams);
            return delResult;
        }
    }
}