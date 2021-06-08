using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Helpers;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper,
        IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var usersList = await _userRepository.GetUsersAsync();
            var members = _mapper.Map<IEnumerable<MemberDto>>(usersList);
            return Ok(members);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string userName)
        {
            var users = await _userRepository.GetUserByUserNameAsync(userName);
            return _mapper.Map<MemberDto>(users);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            AppUser appUser = await _userRepository.GetUserByUserNameAsync(userName);
            _mapper.Map(memberUpdateDto, appUser);
            _userRepository.Update(appUser);

            if (await _userRepository.SaveAllAsync()) return NoContent();
            else
                return BadRequest();

        }
        [HttpPost("{add-photo}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUserNameAsync(userName);
            var photoResult = await _photoService.AddPhotoAsync(file);
            if (photoResult.Error != null)
            {
                return BadRequest(photoResult.Error.Message);
            }
            var photo = new Photo
            {
                Url = photoResult.SecureUrl.AbsoluteUri,
                PublicId = photoResult.PublicId
            };
            if (user.Photos.Count <= 0)
            {
                photo.IsMain = true;
            }
            user.Photos.Add(photo);
            if (await _userRepository.SaveAllAsync())
            {
                return _mapper.Map<PhotoDto>(photo);
            }
            return BadRequest("Some error occured in saving photos");
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //     return await _userRepository.GetUserByIdAsync(id);
        // }

    }
}