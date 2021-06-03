using System.Linq;
using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Entities;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>().ForMember(dest => dest.PhotoUrl, 
            option => option.MapFrom(
                src => src.Photos.FirstOrDefault((x=> x.IsMain)).Url));
            CreateMap<Photo, PhotoDto>();
        }
    }
}