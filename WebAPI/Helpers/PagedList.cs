using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Helpers
{
    public class PagedList<T> : List<T>
    {

        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public PagedList(IEnumerable<T> items, int currentPage, int pageSize, int totalCount)
        {
            TotalCount = totalCount;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling((totalCount / (double)pageSize));
            CurrentPage = currentPage;

            AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source,
        int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, pageNumber, pageSize, count);
        }

    }
}