package com.kokochi.kokocastserver.domain.user;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserNicknameRegistryRepository extends MongoRepository<UserNicknameRegistry, String> {
}
