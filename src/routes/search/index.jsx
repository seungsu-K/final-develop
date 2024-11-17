import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from '@/routes/search/style.module.css';
import Post from '@/components/Post/Post';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import pb from '@/api/pb.js';
import IconButton from '@/components/Button/IconButton';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await pb.collection('appointments').getFullList({
          filter: `title ~ "${searchQuery}" || description ~ "${searchQuery}"`,
        });
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className={S.component}>
      <div className={S.searchBar}>
        <IconButton iconId="left" path="-1" title="뒤로가기" />
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchQuery}
          onChange={handleSearchChange}
          className={S.searchInput}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : searchResults.length > 0 ? (
        <div className={S.resultContainer}>
          {searchResults.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              date={post.date}
              place={post.location}
              member={post.memberCount}
              category={post.category}
              id={post.id}
              writer={post.writer}
              onClick={() => navigate(`/posts/${post.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className={S.noResults}>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default SearchPage;
