using System;
using System.Collections.Generic;

namespace WebAPI.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public int Age { get; set; }
        public string PhotoUrl { get; set; }
        public string UserName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime Created { get; set; }
        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }

    }
}